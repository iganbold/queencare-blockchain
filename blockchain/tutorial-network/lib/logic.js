/**
 * Sample transaction processor function.
 * @param {org.example.mynetwork.ProvideHealthCareServiceTransaction} tx The sample transaction instance.
 * @transaction
 */
async function provideHealthCareServiceTransaction(tx) {

    // Get the asset registry for the ElectronicHealthRecord asset.
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.ElectronicHealthRecord');
  
  	// Get the factory for creating new asset instances.
    var factory = getFactory();
  
    // Create the ElectronicHealthRecord.
    var electronicHealthRecord = factory.newResource('org.example.mynetwork', 'ElectronicHealthRecord', tx.electronicHealthRecordID);
  	electronicHealthRecord.description = tx.description;
  	electronicHealthRecord.createdDate = tx.createdDate;
  	electronicHealthRecord.owner = tx.owner;
  	electronicHealthRecord.doctor = tx.doctor;
  	electronicHealthRecord.organizationID = tx.organizationID;
  
    // Add the ElectronicHealthRecord asset in the asset registry.
    await assetRegistry.add(electronicHealthRecord);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.mynetwork', 'ElectronicHealthRecordCreatedEvent');
    event.electronicHealthRecordID = tx.electronicHealthRecordID;
  	event.description = tx.description;
  	event.createdDate = tx.createdDate;
  	event.owner = tx.owner;
  	event.doctor = tx.doctor;
  	event.organizationID = tx.organizationID;
  	
    emit(event);
}
import { Meteor } from 'meteor/meteor';
import { ExportCollection } from '/imports/api/ExportCollection';

Meteor.startup(() => {
  // code to run on server at startup
  console.log("started")
});

Meteor.methods({
  startExport() {
    const totalProgressSteps = 100;
    const intervalValue = 1000;
    const progressStep = 5;

    const exportId = ExportCollection.insert({ progress: 0, status: 'in-progress' });

    const interval = Meteor.setInterval(() => {
      //Create a new Collection Item
      const exportToUpdate = ExportCollection.findOne(exportId);
      if (exportToUpdate) {//check if export is not undefined
        if (exportToUpdate.progress < totalProgressSteps) {
          //update collection item progress step
          ExportCollection.update(exportId, { $inc: { progress: progressStep } });
        } else {
          //update status and adding a random url from getRandomURL()
          ExportCollection.update(exportId, { $set: { status: 'completed', url: getRandomUrl() } });
          Meteor.clearInterval(interval);
        }
      }
    }, intervalValue);
  },
  clearCollection() {
    try {
      ExportCollection.remove({});
      return true;
    } catch (error) {
      throw new Meteor.Error('clear-collection-error', 'Une erreur est survenue lors de la suppression des données.');
    }
  }
});

// get Random URL
function getRandomUrl() {
  const urls = [
    'https://www.lempire.com/',
    'https://www.lemlist.com/',
    'https://www.lemverse.com/',
    'https://www.lemstash.com/',
  ];
  return urls[Math.floor(Math.random() * urls.length)];
}
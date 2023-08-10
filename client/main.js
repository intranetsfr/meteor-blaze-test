import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ExportCollection } from '/imports/api/ExportCollection';


import './main.html';
import 'material-design-lite/dist/material.min.css';
import 'material-design-lite/dist/material.min.js';

Template.exportList.onCreated(function () {
  this.exports = new ReactiveVar([]);

  console.info("Export List init");
});

Template.exportList.helpers({
  //Get Collection List
  exports() {
    const exportCollection = ExportCollection.find();
    //console.log(exportCollection);
    return exportCollection;
  },
  exportsNotEmpty() {
    return ExportCollection.find().count() > 0;
  },
});
Template.exportList.events({
  'click #startExport'(event, instance) {
    Meteor.call('startExport');
  },
  'click #clearExport'(event, instance) {
    if (confirm("Are you sur ?")) {
      componentHandler.upgradeDom();
      Meteor.call('clearCollection', 'Exports', (error, result) => {
        let message = null;
        if (error) {
          message = error.reason;
        } else {
          message = 'Export is clear now';
        }

        var snackbarContainer = document.querySelector('#snackbarResultClearExports');
        var data = {
          message: message,
          timeout: 2000,
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      });
    }
  }
});


Template.exportList.onRendered(function () {
  //Update MDL Dom
  // Upgrade each progress bar
  const exports = ExportCollection.find().fetch();
  exports.forEach((exportItem) => {
    const progress = exportItem.progress;
    const progressElement = this.find(`#progress_${exportItem._id}`);
    if (progressElement) {
      progressElement.MaterialProgress.setProgress(progress);
    } else {
      console.error(progressElement)
    }
  });
  componentHandler.upgradeDom();
});
document.addEventListener('DOMContentLoaded', () => {
  window.componentHandler.upgradeAllRegistered();
});
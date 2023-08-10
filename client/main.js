import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import 'material-design-lite/dist/material.min.css';
import 'material-design-lite/dist/material.min.js';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

// Initialize Material Design Lite components (if needed)
document.addEventListener('DOMContentLoaded', () => {
  window.componentHandler.upgradeAllRegistered();
});
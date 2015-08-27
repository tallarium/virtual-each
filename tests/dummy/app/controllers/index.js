import Ember from 'ember';
import computed from 'ember-new-computed';

function coerceSet(attributeName) {
  return function(value) {
    const schedulerName = attributeName + '_timer';

    if (schedulerName) {
      Ember.run.cancel(this[schedulerName]);
    }

    this[schedulerName] = Ember.run.later(() => {
      const newValue = parseInt(value, 10);
      if (!Number.isNaN(newValue)) {
        this.set(attributeName, newValue);
      }
    }, 100);
  };
}

export default Ember.Controller.extend({
  actions: {
    setScrollTimeout: coerceSet('scrollTimeout'),
    setPositionIndex: coerceSet('positionIndex'),
    selected(modelType) {
      this.set('selected', modelType);
    },
    grow() {
      this.set('height', this.get('height') + this.get('height') * 0.3);
    },
    shrink() {
      this.set('height', this.get('height') - this.get('height') * 0.3);
    }
  },

  positionIndex: null,
  height: 200,
  scrollTimeout: null,
  selected: 'people',

  componentName: computed('selected', {
    get() {
      return 'x-' + this.get('selected');
    }
  }),
  currentModel: computed('model', 'selected', {
    get() {
      return this.get('model')[this.get('selected')];
    }
  })
});
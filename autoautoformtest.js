Forms = new Meteor.Collection("Forms");
Forms.attachSchema(new SimpleSchema({
  fields: {
    type: [Object]
  },
  "fields.$.name": {
    type: String
  },
  "fields.$.label": {
    type: String
  },
  "fields.$.type": {
    type: String,
    allowedValues: ["Boolean", "String", "Date", "Number"]
  }
}));


const TypeSchemas = {
  Boolean: {
    type: Boolean
  },
  String: {
    type: String
  },
  Date: {
    type: Date
  },
  Number: {
    type: Number
  }

}

if(Meteor.isClient) {
  Template.forms.helpers({
    forms() {
      return Forms.find();
    }
  });

  Template.forms_aForm.helpers({
    updateFormId(){
      return `update_${this._id}`;
    },
    schema(){
      let schema = {};
      for(let field of this.fields) {
        schema[field.name] = {...TypeSchemas[field.type], label: field.label};
      }
      return new SimpleSchema(schema);
    }
  })
}
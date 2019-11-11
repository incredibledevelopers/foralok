export let  settings = {
  columns: {
    conceptTitle: {
      title: 'Concept Name'
    },
    industry: {
      title: 'Industry',
      editor: {
        type: 'list',
        config: {
          selectText: 'Select',
          list: [
            {value: 'IT', title:'IT'},
            {value: 'ENTC', title:'ENTC'},
            {value: 'Mech', title:'Mech'},
            {value: 'CIVIL', title:'CIVIL'},
          ],
        },
      },
      filter: {
        type: 'list',
        config: {
          selectText: 'All',
          list: [
            {value: 'IT', title:'IT'},
            {value: 'ENTC', title:'ENTC'},
            {value: 'Mech', title:'Mech'},
            {value: 'CIVIL', title:'CIVIL'},
          ],
        },
      },
    },
    conceptDescription: {
      title: 'Description'
    },
    conceptLeadOrDrop: {
      title: 'Launch Type',
      editor: {
        type: 'list',
        config: {
          selectText: 'Select',
          list: [
            {value: 'LEAD', title:'LEAD'},
            {value: 'DROP', title:'DROP'}
          ],
        },
      },
      filter: {
        type: 'list',
        config: {
          selectText: 'All',
          list: [
            {value: 'LEAD', title:'LEAD'},
            {value: 'DROP', title:'DROP'}
          ],
        },
      },
    },
    status: {
      title: 'Status',
      editor: {
        type: 'list',
        config: {
          selectText: 'Select',
          list: [
            {value: 'N', title:'New'},
            {value: 'P', title:'Pending'},
            {value: 'C', title:'Closed'}
          ],
        },
      },
      filter: {
        type: 'list',
        config: {
          selectText: 'All',
          list: [
            {value: 'N', title:'New'},
            {value: 'P', title:'Pending'},
            {value: 'C', title:'Closed'}
          ],
        },
      },
    }
  },
  edit: {
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>',
    confirmSave: true
  },
  actions: {
    add: false,
    delete: false,
    custom: [{ name: 'routeToAPage', title: `<i class="fa fa-history" aria-hidden="true"></i>` }],
    position: 'right' 
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
  mode : 'external' 
};
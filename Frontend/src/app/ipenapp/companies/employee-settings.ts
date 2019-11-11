export let  empSettings = {
  columns: {
    username: {
      title: 'Username'
    },
    profileId: {
      title: 'Profile Id'
    },
    designation: {
      title: 'Designation'
    },
    department: {
      title: 'Department',
    },
    salary: {
      title: 'Salary',
    },
    remarks: {
      title: 'Remarks',
    },
    stockUnits: {
      title: 'Stock Units',
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
  actions: {
    add: false,
    delete: false,
    position: 'right' 
  },
  edit: {
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>',
    confirmSave: true
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
  mode : 'external'
};
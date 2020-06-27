function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      glasses: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.glasses = response.data));
    },
    methods: {
      deleteGlass: function(id) {
        console.log('HTTP DELETE spre backend, glass: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.glasses = response.data));  
        });
      },
    }
  });


}

document.addEventListener('DOMContentLoaded', () => {
  run();
});

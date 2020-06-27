function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        glass: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/glasses/'+this.id).then(
            (response) => {
                this.glass = response.data;
            }
        );
      },
      methods: {
        update: function(){
         

            return axios.post('http://localhost:3000/glasses', this.glass).then(
                (response) => {
                   this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  
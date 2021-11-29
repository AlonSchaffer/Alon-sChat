import axios from 'axios'
class DataBaseService{
    static async GetUsers(){
      axios.get("http://localhost:3001/users").then((response)=>{
          console.log(response)
          return response;
      })
    }
    
    static async AddUser(user){
        console.log(user)
        if(user.username != null && user.email !=null && user.password !=null){
           await axios.post("http://localhost:3001/users",user).then(response =>{
                console.log(response)
                return response
            })
        }
        else{
            return false
        }      
    }

    static async UpdateUser(username){
        
    }

}

export default DataBaseService
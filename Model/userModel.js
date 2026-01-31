import database from "../Db/Database_config.js";

const table="user";


class UserModel{
    static async createUser({name,email,hashedPassword}){
        const create_Query=`INSERT INTO ${table} (name,email,password) VALUES (?,?,?)`;
        const [res]=await database.execute(create_Query,[name,email,hashedPassword]);
        return res;
    }

    static async getUser(){
        const get_query=`SELECT * FROM ${table}`;
        const [res]=await database.execute(get_query);
        return res;
    }

    static async editUser({name,email,hashedPassword,id}){
        const edit_query=`UPDATE ${table} SET name=?, email=?, password=? WHERE id=?`;
        const [res]=await database.execute(edit_query,[name,email,hashedPassword,id]);
        return res;
    }
    static async deleteUser(id){
        const delete_query=`Delete from ${table} where id=?`;
        const [res]=await database.execute(delete_query,[id]);
        return res;
    }
}
export default UserModel;
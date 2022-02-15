import axios from "axios"
const signup = {}

signup.admin = async (email, password) =>
{
    const result = await (await axios.post('http://localhost:3000/admin/register', {email: email, password: password})).data;
    if(result.status === "success")
    {
        document.location.href = "/dashboard"
    }
    else
    {
        alert(result.message)
    }
}

export default signup
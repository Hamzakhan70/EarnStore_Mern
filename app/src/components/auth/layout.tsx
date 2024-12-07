import { Outlet } from "react-router-dom"

function AuthLayout(){
    return(<>
    <h1>authlayout</h1>
    <Outlet/>
    </>)
}
export default AuthLayout
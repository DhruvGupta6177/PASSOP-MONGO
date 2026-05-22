import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])



    const showpassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("public/Icons/visibilityoff.png")) {
            ref.current.src = "public/Icons/visibility.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "public/Icons/visibilityoff.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){
        setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({site: "", username: "", password: ""})
        toast('Password Saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });

    }
    else{
        toast('Error:Password Not Saved!');

    }

    }

    const editPassword = (id) => {
        console.log("Editing the password with id ", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        // let c = confirm("Do you really want to delete this password?")
        
        // setpasswordArray([...passwordArray, form])
        // localStorage.getItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])

    }

    const deletePassword = (id) => {
        console.log("Deleting the password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }


        
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        
        // setpasswordArray([...passwordArray, form])
        // localStorage.getItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log([...passwordArray, form])

    }

    const copyText = (text) => {
        toast('Copied To Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }



    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute bg-green-50 inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>


                </h1>
                <p className='text-green-900 text-lg text-center'>Your Password Manager</p>

                <div className="flex flex-col items-center p-4 text-black gap-8">
                    <input name='site' value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input name='username' value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" />
                        <div className="relative">
                            <input ref={passwordRef} name='password' value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-1' width={26} src="public/Icons/visibilityoff.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex items-center gap-2  justify-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>
                <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to show</div>}
                {passwordArray.length != 0 &&
                    <table className="table-auto mb-10 w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.site) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.username) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.password}</span>
                                            <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.password) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/ylvuooxd.json"
                                                trigger="hover"
                                                style={{"width":"25px","height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hjbrplwk.json"
                                                trigger="hover"
                                                style={{"width":"25px","height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}

            </div>
        </>
    )
}

export default Manager

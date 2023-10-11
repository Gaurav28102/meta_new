import React from "react";
import "../styles/Transfer.css";
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { InputGroup, FormControl, Button } from "react-bootstrap";
import NavBarLoggedIn from "./NavBarLoggedIn";
import Footer from "./Footer";
import Message from "./Message";
import { ethers } from "ethers";

import useEventListener from "@use-it/event-listener";


import Transaction from "./Transaction.json";
// // import {} from "../config.js";
import { ContractAddress } from "./config";

// import { sign } from "jsonwebtoken";

const Transfer = () => {

    const navigate = useNavigate()
    const [receiverEmail, setReceiverEmail] = useState()
    const [amount, setAmount] = useState('')
    const [desc, setDesc] = useState('')
    const [currentaccount,setcurrentaccount]=useState('');
    const [walletconnected,setWalletconnected]=useState(false);
    // const ESCAPE_KEYS = ['27', 'Escape'];

    // function handler({ key }) {
    //     if (ESCAPE_KEYS.includes(String(key))) {
    //       console.log('Escape key pressed!');
    //     }
    
    // useEventListener('keydown', handler);
    async function handleTrans(){
        console.log(`Function called`);
        const req = await fetch('http://localhost:8000/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: receiverEmail,
                balance: amount,
                desc: desc,
            })
        })
        const data = await req.json()
        console.log(data)
        if(data.status === 'ok'){

                navigate('/confirmation')
         
        }
    }
    async function connectwallet(){
        try{
           // const {ethereum} =window;
           if(!window.ethereum){
               console.log("Metamask not connected");
               return
           }
        }catch(err){
           console.log(err);
        
       }
       const account=await window.ethereum.request({method:'eth_requestAccounts'});
       console.log("Account found "+account[0]);
       setWalletconnected(true);
       setcurrentaccount(account[0]);
       }
    async function transferMoney(event) {
        event.preventDefault(); 

       

        try{ 
          if(window.ethereum){
            const provider=new ethers.providers.Web3Provider(window.ethereum);
            const signer=provider.getSigner();
            const TaskContract=new ethers.Contract(ContractAddress,Transaction.abi,signer);
  
            TaskContract.makepayment('0xDeDBdcc93d0Bb6dDb56C9128798c81e576F2B938',100).then((m)=>{
                if(!m.code){
                    console.log("Success");
                    handleTrans();
                }else{
                    console.log("reject");
                    navigate("/failed")
                }
            }).catch((e)=>{
                console.log(e);
                navigate("/failed")
            });
          }
        }catch(err){
            console.log(err);
            
        }





    }
    
    return (
        <div>
            <NavBarLoggedIn />
            <div>
                <div className="bgh">
                    <h1 className="transfer-heading">MetaTransfer  </h1>
                    <div className="leftc">
                        {walletconnected?<h3 style={{color:"white" ,backgroundColor:"black",width:"800px" ,padding:"10px"}}>{currentaccount}</h3>:""}
                        {walletconnected?<Message/>:""}
                        <button onClick={connectwallet}>Connect Wallet</button>
                        <h3 className="transfer-title">Transfer Form</h3>
                        <>
                            {/* <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@User</InputGroup.Text>
                                <FormControl
                                    placeholder="Your Bank Account No"
                                    aria-label="User Acc No"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup> */}

                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Recipient's Email"
                                    value={receiverEmail}
                                    onChange={(e) => setReceiverEmail(e.target.value)}
                                    aria-label="Recipient's Acc No"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Text id="basic-addon2">@Recipient</InputGroup.Text>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>$ Amount</InputGroup.Text>
                                <FormControl 
                                    aria-label="Amount (to the nearest Rupee)"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>

                            <InputGroup>
                                <InputGroup.Text>Description of the transaction</InputGroup.Text>
                                <FormControl 
                                    as="textarea" 
                                    aria-label="With textarea"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)} />
                            </InputGroup>

                            <Button className="mt-3" variant="primary" size="lg" onClick={transferMoney}>Transfer</Button>
                        </>
                    </div>
                    <div className="rightc">
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Transfer;
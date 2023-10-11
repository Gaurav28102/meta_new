import React from 'react'

export default function Message() {
    const alert = {
        padding:"20px",
        backgroundColor:"green",
        color:"white",
        marginBottom:"15px"
      };
      const closebtn={
        marginLeft: "15px",
        color: "white",
        fontWeight: "bold",
        float: "right",
        fontSize: "22px",
        lineHeight: "20px",
        cursor: "pointer",
        transition: "0.3s"
      }
      const remove=(e)=>{
        e.target.style.display="none";
        document.getElementById("div").style.display="none";
      }
  return (
    
<div id="div" style={ alert}>
  <span class="closebtn" style={closebtn} onClick={remove}>&times;</span>
 Wallet Connected Successfully
</div>
  )
}

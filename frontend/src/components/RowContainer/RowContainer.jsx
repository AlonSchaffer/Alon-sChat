import React from "react";
import './RowContainer.css'
export default function RowContainer(props) {
return <div className='RowContainer'>
{props.children}
</div>
}

import React from 'react'
import './Edit.css'
import { useParams } from 'react-router-dom';

function Edit({ fetchedData }) {
    const { Id } = useParams();          // this will fetch the parameters of the URL
    const data = fetchedData[Id-1];      // Student's details

    return (
        <div>
            
           {
            data?.name
           }
        </div>
    )
}

export default Edit

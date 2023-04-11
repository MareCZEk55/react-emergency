import React from 'react'
import MainGrid from '../components/MainGrid';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Prehled() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.30.200:3030/currentday").then(
            response => {
                setData(response.data);
            }
        ).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <div>
                <MainGrid props={data} />
            </div>
        </>
    )
}


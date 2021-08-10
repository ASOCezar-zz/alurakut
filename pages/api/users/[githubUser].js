import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MainGrid from '../../../src/components/MainGrid'
import { AlurakutMenu } from '../../../src/lib/AlurakutCommons';

export default function userPage() {

    const [data, setData] = useState([])
    const [error, updateError] = useState('')


    useEffect(() => {
        axios
            .get('https://api.github.com/users/asocezar')
            .then(res => setData(res.data))
            .catch(error => {
                updateError(error.message);
            })
    }, [])

    console.log(data)

    return (
        <div>
            <AlurakutMenu />
            <MainGrid>

            </MainGrid>
        
        </div>
    )
}
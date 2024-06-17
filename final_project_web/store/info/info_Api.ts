const jwt = require("jsonwebtoken");
import type { NextApiRequest, NextApiResponse } from 'next'
import {URL} from '../host';


export async function fetchInfoQuestion() {
   
    try {
        const response = await fetch(`${URL}/information/getNumberOfAllQuestion`, {
            method: 'GET',
            headers: {
                Authorization: '',
                'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
  
       
    } catch (error) {
        console.error('Error fetching info:', error);
        throw error;
    }
  }
  export async function fetchInfoUsers() {
   
    try {
        const response = await fetch(`${URL}/information/numberAllUser`, {
            method: 'GET',
            headers: {
                Authorization: '',
                'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
  
       
    } catch (error) {
        console.error('Error fetching info:', error);
        throw error;
    }
  }
  
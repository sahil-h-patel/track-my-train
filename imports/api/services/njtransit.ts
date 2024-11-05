import axios from 'axios';
import { Meteor } from 'meteor/meteor';
import dotenv from 'dotenv';
import { env } from '@env';

dotenv.config();

let token: string

Meteor.methods({
    async getToken(){
        try {
            const body = new FormData()
            body.append('username', env.USERNAME);
            body.append('password', env.PASSWORD);
            const response = await axios.post(env.API_URL, body, {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'multipart/form-data'
                }
            });
            token = response.data.UserToken;
            console.log('API Token retrieved')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Meteor.Error('API request failed', error.message);
            } else {
                throw new Meteor.Error('API request failed', 'Unknown error occurred');
            }
        }
    },
    async getStationSchedule(){
        try {

            const body = new FormData()
            body.append('token', token);
            const response = await axios.post(env.API_URL, body, {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.UserToken;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Meteor.Error('API request failed', error.message);
            } else {
                throw new Meteor.Error('API request failed', 'Unknown error occurred');
            }
        }
    }

});
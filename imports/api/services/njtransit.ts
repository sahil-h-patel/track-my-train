import axios from 'axios';
import { Meteor } from 'meteor/meteor';
import dotenv from 'dotenv';
import { env } from '@env';
import { StationSchedule, Stop, StationTrainSchedule, TrainItem, StationItem} from '@models/schedule';
import { Capacity, Car, Section } from '@models/train';

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
    // getTrainSchedule
    async getTrainScheduleForStation(station: string): Promise<StationTrainSchedule> {
        try {
            const body = new FormData()
            body.append('token', token);
            body.append('station', station)
            const response = await axios.post(env.API_URL, body, {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'multipart/form-data'
                }
            });
            const stationSchedule: StationTrainSchedule = response.data.map((station: StationTrainSchedule) => ({ 
                STATION_2CHAR: station.station_2char,
                STATION_NAME: station.station_name,
                STATIONMSGS: station.station_msgs.map((msg: any) => ({
                    MSG_TYPE: msg.msg_type,
                    MSG_TEXT: msg.msg_text,
                    MSG_PUBDATE: msg.msg_pubdate,
                    MSG_AGENCY: msg.msg_agency,
                    MSG_STATION_SCOPE: msg.msg_station_scope,
                    MSG_LINE_SCOPE: msg.msg_line_scope
                })),
                ITEMS: station.items.map((item: TrainItem) => ({
                    SCHED_DEP_DAATE: item.sched_dep_date,
                    DESTINATION: item.destination,
                    TRACK: item.track,
                    LINE: item.line,
                    TRAIN_ID: item.train_id,
                    STATUS: item.status,
                    SEC_LATE: item.sec_late,
                    LAST_MODOFIED: item.last_modified,
                    GPSLATITUDE: item.gpslatitude,
                    GPSLONGITUDE: item.gpslongitude,
                    GPSTIME: item.gpstime,
                    STATION_POSITION: item.station_position,
                    LINECODE: item.linecode,
                    LINEABBREVIATION: item.lineabbreviation,
                    CAPACITY: item.capacity.map((cap: Capacity) => ({
                        VEHICLE_NO: cap.created_time,
                        LATITUDE: cap.latitude,
                        LONGITUDE: cap.longitude,
                        CREATED_TIME: cap.created_time,
                        VEHICLE_TYPE: cap.vehicle_type,
                        CUR_PERCENTAGE: cap.cur_percentage,
                        CUR_CAPACITY_COLOR: cap.cur_capacity_color,
                        CUR_PASSENGER_COUNT: cap.cur_passenger_count,
                        SECTIONS: cap.sections.map((section: Section) => ({
                            SECTION_POSTION: section.section_position,
                            CURRENT_PERCENTAGE: section.cur_percentage,
                            CURRENT_CAPACITY_COLOR: section.cur_capacity_color,
                            CURRENT_PASSENGER_COUNT: section.cur_passenger_count,
                            CARS: section.cars.map((car: Car) => ({
                                CAR_NO: car.car_no,
                                CAR_POSITION: car.car_position,
                                CAR_REST: car.car_rest,
                                CUR_PERCENTAGE: car.cur_percentage,
                                CUR_CAPACITY_COLOR: car.cur_capacity_color,
                                CUR_PASSENGER_COUNT: car.cur_passenger_count
                            }))
                        }))
                    })),
                    STOPS: item.stops.map((stop: Stop) => ({
                        STATION_2CHAR: stop.station_2char,
                        STATIONNAME: stop.station_name,
                        TIME: stop.time,
                        PICKUP: stop.pickup,
                        DROPOFF: stop.dropoff,
                        DEPARTED: stop.departed,
                        STOP_STATUS: stop.stop_status,
                        DEP_TIME: stop.dep_time,
                        TIME_UTC_FORMAT: stop.time_utc_format
                    }))
                }))
            }));
            return stationSchedule;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Meteor.Error('API request failed', error.message);
            } else {
                throw new Meteor.Error('API request failed', 'Unknown error occurred');
            }
        }
    },
    // getStationSchedule
    async getStationSchedule(station?: string): Promise<StationSchedule>{
        try {
            const body = new FormData()
            body.append('token', token);
            if(station) body.append('station', station);
            const response = await axios.post(env.API_URL, body, {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'multipart/form-data'
                }
            });
            const stationSchedule: StationSchedule = response.data.map((station: StationSchedule) => ({ 
                STATION_2CHAR: station.station_2char,
                STATION_NAME: station.station_name,
                ITEMS: station.items.map((item: StationItem) => ({
                    SCHED_DEP_DAATE: item.sched_dep_date,
                    DESTINATION: item.destination,
                    TRACK: item.track,
                    LINE: item.line,
                    TRAIN_ID: item.train_id,
                    CONNECTING_TRAIN_ID: item.connecting_train_id,
                    STATION_POSITION: item.station_position,
                    DIRECTION: item.direction,
                    DWELL_TIME: item.dwell_time,
                    PERM_PICKUP: item.perm_pickup,
                    PERM_DROPOFF: item.perm_dropoff,
                    STOP_CODE: item.stop_code
                }))
            }));
            return stationSchedule;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Meteor.Error('API request failed', error.message);
            } else {
                throw new Meteor.Error('API request failed', 'Unknown error occurred');
            }
        }
    }
});
import { ADD_DEVICES_IP, ADD_ALBUMS } from "./types";

export const AddAlbums = (Ip)=>(
    {
        type: ADD_ALBUMS,
        data: Ip
    }
);

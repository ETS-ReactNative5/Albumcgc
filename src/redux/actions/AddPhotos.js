import { ADD_PHOTOS } from "./types";

export const AddPhotos = (Photo)=>(
    {
        type: ADD_PHOTOS,
        data: Photo
    }
);

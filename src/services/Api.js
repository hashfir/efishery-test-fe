/* eslint-disable no-console */
import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const getDataFirst = (limit = 10, offset = 0, search = '') => fetch(`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list?search=${(search)}&limit=${limit}&offset=${offset}`, {
  method: 'GET',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}).then(res => res.json())
  .then(
    (result) => Promise.resolve(
      result,
    ),
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      Toast.fire({
        icon: 'error',
        text: 'Server Error',
      });
      console.log(error);
    }
  );

export const getArea = () => fetch(`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area`, {
  method: 'GET',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}).then(res => res.json())
  .then(
    (result) => Promise.resolve(
      result,
    ),
    (error) => {
      Toast.fire({
        icon: 'error',
        text: 'Server Error',
      });
      console.log(error);
    }
  );

export const getSize = () => fetch(`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size`, {
  method: 'GET',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}).then(res => res.json())
  .then(
    (result) => Promise.resolve(
      result,
    ),
    (error) => {
      Toast.fire({
        icon: 'error',
        text: 'Server Error',
      });
      console.log(error);
    }
  );

  export const submitData = async (data) => {
    const URL = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list";
    const response = await fetch(URL, {
      method: data.type === 'add' ? "POST" : "PUT",
      body: JSON.stringify(data.payload),
    });
  
    if (!response.ok) {
      throw new Error("An error has occured");
      
    }
    return await response.json();
  };

  export const deleteData = async (data) => {
    const URL = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list";
    const response = await fetch(URL, {
      method: "DELETE",
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("An error has occured");
      
    }
    return await response.json();
  };

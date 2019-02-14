require('./styles/index.scss');

import PopperJs from 'popper.js';
import jquery from 'jquery';
import rest from './rest';

const $ = jquery;

const detail = (e) => {
    debugger
    let id = $(e.target).attr('data-id');
    let $detail = $(`.user-tr-detail-${id}`);
    if($detail.length == 0) {
        rest.getPostById(id)
        .then((posts)=>{
            posts.forEach(post=> {
                $(`#user-tr-${id}:last`).after(`
                    <tr class="tb-white user-tr-detail-${id}">
                        <td colspan="6">
                            <div><strong>${post.title}</strong></div>
                            <div>${post.body}</div>
                        </td>
                    </tr>`);
            });
        });
    } else {
        $(`.user-tr-detail-${id}`).remove();
    }
}

const addDetailEvent = (user) => {
    $(`#detail-button-${user.id}`).click((e)=> {
        detail(e);
    });
}

const populateUser = (user, index) => {
    $('#users-table>tbody')
    .append(`<tr id="user-tr-${user.id}">
                <th>${index+1}</th>
                <td>${user.name}</td>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <button id="detail-button-${user.id}" type="button" class="btn btn-info" data-id="${user.id}">Detail</button>
                </td>
            </tr>`);
}

rest.getUsers()
.then((users)=>{
    users.forEach((user, i) => {
        populateUser(user, i);
        addDetailEvent(user);
    })
});
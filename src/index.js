require('./styles/index.scss');

import PopperJs from 'popper.js';
import jquery from 'jquery';
import rest from './rest';

const $ = jquery;

//operation to display the post into the table
const _populatePost = (posts, id) => {
    posts.forEach(post=> {
        $(`#user-tr-${id}:last`).after(`
            <tr class="tb-white user-tr-detail-${id}">
                <td colspan="6">
                    <div><strong>${post.title}</strong></div>
                    <div>${post.body}</div>
                </td>
            </tr>`);
    });
}

//Show details when the button was clicked
const _showDetail = (e) => {
    let id = $(e.target).attr('data-id'),
        $detail = $(`.user-tr-detail-${id}`);

    if($detail.length == 0) {
        rest.getPostById(id)
        .then((posts)=>{
            _populatePost(posts, id);
        });
    } else {
        $(`.user-tr-detail-${id}`).remove();
    }
}

//add click event into the button
const _addDetailEvent = (user) => {
    $(`#detail-button-${user.id}`).click((e)=> {
        _showDetail(e);
    });
}

//operation to display the user into the table
const _populateUser = (user, index) => {
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

//operation to retrieve the users
rest.getUsers()
.then((users)=>{
    users.forEach((user, i) => {
        _populateUser(user, i);
        _addDetailEvent(user);
    })
});
"use strict";

function getQuery(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && parseInt(xhr.status / 100) === 2) {
            const answer = xhr.responseText;
            xhr = null;
            callback(answer.toString());
        }
    }
}

function bodyQuery(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method.toString(), url, true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.send(body.toString());
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && parseInt(xhr.status / 100) === 2) {
            const answer = xhr.responseText;
            xhr = null;
            callback(answer.toString());
        }
    }
}

function getQueryWithToken(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", localStorage.getItem("MyToken"));
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && parseInt(xhr.status / 100) === 2) {
            const answer = xhr.responseText;
            xhr = null;
            callback(answer.toString());
        }
    }
}

function bodyQueryWithToken(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open(method.toString(), url, true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", localStorage.getItem("MyToken"));
    xhr.send(body.toString());
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && parseInt(xhr.status / 100) === 2) {
            const answer = xhr.responseText;
            xhr = null;
            callback(answer.toString());
        }
    }
}

function get(s) {
    return document.getElementById(s.toString());
}

////////////////////////////////////////////////////////////////////////////////////////

const start = "http://api.keklik.xyz/api";

function registrate() {
    const login = get("loginField").value;
    const passsword = get("passwordField").value;

    bodyQuery("POST", start + "/users/", JSON.stringify({
        username: login,
        password: passsword,
    }), (answer) => {
       const answerObj = JSON.parse(answer.toString());
       const token = answerObj.token.toString();
       localStorage.setItem("MyToken", "Token " + token);
       localStorage.setItem("UserName", login);
       alert("Регистрация\n" + answer);
    });
}

function avtorizate() {
    const login = get("loginField").value;
    const passsword = get("passwordField").value;

    bodyQuery("POST", start + "/session/", JSON.stringify({
        username: login,
        password: passsword,
    }), (answer) => {
        const answerObj = JSON.parse(answer.toString());
        const token = answerObj.token.toString();
        localStorage.setItem("MyToken", "Token " + token);
        localStorage.setItem("UserName", login);
        alert("Авторизация\n" + answer);
    });
}

function createorganization() {
    const organizationName = get("organizationNameField").value;
    bodyQueryWithToken("POST", start + "/organizations/", JSON.stringify({
       name: organizationName
    }), (answer) => {
        alert(answer);
    });
}

function geymyorganizations() {
    const myOrgs = [];

    getQueryWithToken(start + "/organizations/", (answer) => {
        const arr = JSON.parse(answer.toString());
        arr.forEach((element) => {
           const admins = element.admins;
           admins.forEach((adminMan) => {
              if(adminMan.user.username === localStorage.getItem("UserName")) {
                  // myOrgs.push("Name: " + element.name + "   Id: " + element.id + "\n");
                  myOrgs.push("<br>Org_Name: " + element.name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Org_Id: " + element.id);
              }
           });
        });
        // alert(myOrgs);
        get("answer").innerHTML = myOrgs;
    });
}

function getGroupsInOrgs() {
    const myGroups = [];

    const id = get("organIDfield").value;
    getQueryWithToken(start + "/organizations/" + id + "/groups/", (answer) => {
        const arr = JSON.parse(answer);
        arr.forEach((group) => {
            myGroups.push("<br>Group_Name: " + group.name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Group_Id: " + group.id);
            // myGroups.push("GroupName: " + group.name + "   GroupId: " + group.id + "\n");
        });
        // alert(myGroups);
        get("answer").innerHTML = myGroups;
    });
}

function addGroupFunc() {
    const groupName = get("groupNameAddingToOrg").value;
    const orgId = get("orgIdFF").value;

    bodyQueryWithToken("POST", start + `/organizations/${orgId}/groups/`, JSON.stringify({
        name: groupName,
    }), (answer) => {
       alert(answer);
    });
}

function lookMembersGroup() {
    const mmm = [];

    const groupId = get("groupIdField").value;
    getQueryWithToken(start + `/groups/${groupId}/members/`, (answer) => {
        const members = JSON.parse(answer.toString());
        members.forEach((m) => {
            mmm.push("<br>ID: " + m.id + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User: " + m.user + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Role: " + m.role);
            // mmm.push("ID: " + m.id + "  User: " + m.user + "\n");
        });
        // alert(mmm);
        get("answer").innerHTML = mmm;
    });
}

function addusertogroup() {
    const groupId = get("groupIdAddingUser").value;
    const role = get("cb1").value;
    const userName = get("userNameAddingField").value;

    bodyQueryWithToken("POST", start + `/groups/${groupId}/members/`, JSON.stringify({
        user: userName + "",
        role: role + "",
    }), (answer) => {
       alert(answer);
    });
}


function debug01() {
    player.push('a');
    player.push('b');
    player.push('c');
    player.push('d');
    player.push('e');
    player.push('f');
    player.push('g');
    player.push('h');
    player.push('i');
    player.push('j');
    show_player();
}


let player = [];
let resting_player = [];

function show_player() {
    let div_playing = document.getElementById('playing');

    while (div_playing.firstChild) {
        div_playing.removeChild(div_playing.firstChild);
    }

    for (let i = 0; i < player.length; i++) {

        let div_participant = document.createElement('div');

        let button_rest = document.createElement('button');
        button_rest.textContent = '休憩';
        button_rest.onclick = rest_player.bind(null, player[i]);

        let list_element = document.createElement('label');
        list_element.textContent = player[i];

        let nl = document.createElement('br');

        div_participant.id = 'part_'+player[i];
        div_participant.appendChild(button_rest);
        div_participant.appendChild(list_element);
        div_participant.appendChild(nl);
    
        document.getElementById('playing').appendChild(div_participant);
    }
}


function show_resting_player() {
    let div_resting_player = document.getElementById('resting');

    while (div_resting_player.firstChild) {
        div_resting_player.removeChild(div_resting_player.firstChild);
    }

    for (let i = 0; i < resting_player.length; i++) {

        let div_resting_player = document.createElement('div');

        let button_return = document.createElement('button');
        button_return.textContent = '復帰';

        let button_leave = document.createElement('button');
        button_leave.textContent = '帰宅';

        let list_element = document.createElement('label');
        list_element.textContent = resting_player[i];

        let nl = document.createElement('br');

        button_return.onclick = return_player.bind(null, resting_player[i]);
        button_leave.onclick = leave_player.bind(null, resting_player[i]);
        div_resting_player.id = 'rest_'+resting_player[i];
        div_resting_player.appendChild(button_return);
        div_resting_player.appendChild(button_leave);
        div_resting_player.appendChild(list_element);
        div_resting_player.appendChild(nl);
    
        document.getElementById('resting').appendChild(div_resting_player);
    }
}


function add_player() {
    let player_name = document.getElementById('player_name').value;
    player.push(player_name);

    document.getElementById('player_name').value = '';
    show_player();
}


function rest_player( player_name ) {
    // 参加者から削除
    let index = player.indexOf(player_name);
    player.splice(index,1);

    let div_player = document.getElementById('part_'+player_name);
    div_player.remove();

    // 休憩中へ追加
    resting_player.push(player_name);
    show_resting_player();
}


function return_player( player_name ) {
    // 休憩中から削除
    let index = resting_player.indexOf(player_name);
    resting_player.splice(index,1);

    let div_resting_player = document.getElementById('rest_'+player_name);
    div_resting_player.remove();

    // 参加者へ追加
    player.push(player_name);

    show_player();
    show_resting_player();
}


function leave_player( player_name ) {
    // 休憩中から削除
    let index = resting_player.indexOf(player_name);
    resting_player.splice(index,1);

    let div_resting_player = document.getElementById('rest_'+player_name);
    div_resting_player.remove();

    show_resting_player();
}








let player = [];

function show_player() {
    let div_playing = document.getElementById('playing');

    while (div_playing.firstChild) {
        div_playing.removeChild(div_playing.firstChild);
    }

    for (let i = 0; i < player.length; i++) {
        let button_rest = document.createElement('button');
        button_rest.textContent = '休憩';
        let div_participant = document.createElement('div');
        let list_element = document.createElement('label');
        list_element.textContent = player[i];
        let nl = document.createElement('br');
        div_participant.onclick = rest_player.bind(null, player[i]);
        div_participant.id = player[i];
        div_participant.appendChild(button_rest);
        div_participant.appendChild(list_element);
        div_participant.appendChild(nl);
    
        document.getElementById('playing').appendChild(div_participant);
        // let participant = player[i];
        // console.log(participant);
    }
}


function add_player() {
    let player_name = document.getElementById('player_name').value;
    player.push(player_name);

    document.getElementById('player_name').value = '';
    show_player();
}

function rest_player( player_name ) {
    let index = player.indexOf(player_name);
    player.splice(index,1);

    let div_player = document.getElementById(player_name);
    div_player.remove();
}






// for debug
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




// コートの描画
const court_info = {
    "width" : 6.1,
    "height" : 13.4,
    "singles_width" : 2.530+0.04,
    "service_short" : 1.980+0.02,
    "service_long_doubles" : 1.980+0.04+3.88+0.02,
    "gap" : 1
};


// シーンを作成
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f8);   

// カメラを作成
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera(-10, +10, 10, -10, 0.1, 1000);
// camera.position.x = (( court_info.width + court_info.gap ) * 3 + court_info.gap)/2;
camera.position.x = 0;
camera.position.y = 5;
camera.position.z = -((( court_info.height + court_info.gap ) + court_info.gap)/2+3);

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 床面を作成
const floorGeometry = new THREE.PlaneGeometry(
    ( court_info.width + court_info.gap ) * 3 + court_info.gap,
    ( court_info.height + court_info.gap ) + court_info.gap,
    1, 1);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// ライトを追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 環境光
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 方向光
directionalLight.position.set(10, 20, 10); // 光源の位置を設定
scene.add(directionalLight);

// OrbitControlsを追加
const controls = new THREE.OrbitControls(camera, renderer.domElement);



// let square = new THREE.Geometry();
// square.vertices.push(new THREE.Vector3(0, 0, 0));
// square.vertices.push(new THREE.Vector3(0, 100, 0));
// square.vertices.push(new THREE.Vector3(100, 100, 0));
// square.vertices.push(new THREE.Vector3(100, 0, 0));
// square.vertices.push(new THREE.Vector3(0, 0, 0));

// square.faces.push(new THREE.Face3(0, 1, 2));
// square.faces.push(new THREE.Face3(0, 3, 2));
// var line = new THREE.Line(square, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 }));
// scene.add(line);


// コートを作成
const mesh_court = new THREE.Group();
const geo_court = new THREE.PlaneGeometry(
    court_info.width,
    court_info.height,
    1, 1);
const mat_court = new THREE.MeshBasicMaterial({ color: 0x4682b4, side: THREE.DoubleSide });
const mesh_court_floor = new THREE.Mesh(geo_court, mat_court);
mesh_court_floor.rotation.x = Math.PI / 2;
mesh_court_floor.position.y = 1e-3;
mesh_court.add(mesh_court_floor);

// 線の描画
const mat_line = new THREE.LineBasicMaterial({ color: 0xffffff });

const side_line_points = [];
side_line_points.push(new THREE.Vector3(0, 0, -court_info.height/2));
side_line_points.push(new THREE.Vector3(0, 0,  court_info.height/2));
const geo_side_line = new THREE.BufferGeometry().setFromPoints(side_line_points);
const side_line = new THREE.Line(geo_side_line, mat_line);
side_line.position.y = 1.1e-3;
side_line_0 = side_line.clone();
side_line_1 = side_line.clone();
side_line_2 = side_line.clone();
side_line_3 = side_line.clone();

side_line_0.position.x = -court_info.width/2;
side_line_1.position.x = -court_info.singles_width;
side_line_2.position.x = court_info.singles_width;
side_line_3.position.x = court_info.width/2;
mesh_court.add(side_line_0);
mesh_court.add(side_line_1);
mesh_court.add(side_line_2);
mesh_court.add(side_line_3);


const service_line_points = [];
service_line_points.push(new THREE.Vector3(-court_info.width/2, 0, 0));
service_line_points.push(new THREE.Vector3( court_info.width/2, 0, 0));
const geo_service_line = new THREE.BufferGeometry().setFromPoints(service_line_points);
const service_line = new THREE.Line(geo_service_line, mat_line);
service_line.position.y = 1.1e-3;
service_line_0 = service_line.clone();
service_line_1 = service_line.clone();
service_line_2 = service_line.clone();
service_line_3 = service_line.clone();
service_line_4 = service_line.clone();
service_line_5 = service_line.clone();

service_line_0.position.z = -court_info.height/2;
service_line_1.position.z = -court_info.service_long_doubles;
service_line_2.position.z = -court_info.service_short;
service_line_3.position.z = court_info.service_short;
service_line_4.position.z = court_info.service_long_doubles;
service_line_5.position.z = court_info.height/2;

mesh_court.add(service_line_0);
mesh_court.add(service_line_1);
mesh_court.add(service_line_2);
mesh_court.add(service_line_3);
mesh_court.add(service_line_4);
mesh_court.add(service_line_5);


const center_line_points = [];
center_line_points.push(new THREE.Vector3(0, 0, court_info.service_short));
center_line_points.push(new THREE.Vector3(0, 0, court_info.height/2));
const geo_center_line = new THREE.BufferGeometry().setFromPoints(center_line_points);
const center_line = new THREE.Line(geo_center_line, mat_line);
center_line.position.y = 1.1e-3;
center_line_0 = center_line.clone();
center_line_1 = center_line.clone();

center_line_1.position.z = -court_info.height/2 -court_info.service_short;

mesh_court.add(center_line_0);
mesh_court.add(center_line_1);


const mesh_court_0 = mesh_court.clone();
const mesh_court_1 = mesh_court.clone();
const mesh_court_2 = mesh_court.clone();

mesh_court_0.position.x = -court_info.width-court_info.gap;
mesh_court_1.position.x = 0;
mesh_court_2.position.x = court_info.width+court_info.gap;

scene.add(mesh_court_0);
scene.add(mesh_court_1);
scene.add(mesh_court_2);



function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();





let player = [];
let resting_player = [];
let not_assigned_player = [];
let assigned_player = [];

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

    // 休憩者配列をランダムに作成
    

    // 選択可能なコート数を設定
    sel_court_num = document.getElementById('court_num');
    while(sel_court_num.firstChild) {
        sel_court_num.removeChild(sel_court_num.firstChild);
    }
    let max_court_num = Math.floor(player.length/4);
    for (let i = 0; i < max_court_num; i++) {
        let option = document.createElement('option');
        option.value = i+1;
        option.textContent = i+1;
        sel_court_num.appendChild(option);
    }
    sel_court_num.value = max_court_num;

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

// 既存のプレイヤー表示オブジェクトを削除する関数
function clearPlayerObjects() {
    const objectsToRemove = [];
    scene.traverse((child) => {
        if (child.userData && child.userData.isPlayerObject) {
            objectsToRemove.push(child);
        }
    });
    objectsToRemove.forEach((obj) => {
        scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
    });
}

// 人型の看板を作成する関数
function createPlayerFigure(playerName, position, color = 0x8B4513) {
    const group = new THREE.Group();
    
    // 人型の体（シリンダー）
    const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1.5, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    group.add(body);
    
    // 頭（球体）
    const headGeometry = new THREE.SphereGeometry(0.2, 8, 6);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xFFDBB3 }); // 肌色
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.7;
    group.add(head);
    
    // 台座（看板の足元）
    const baseGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x404040 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.05;
    group.add(base);
    
    // 名前プレート（看板）
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    // 看板の背景
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    
    // 名前のテキスト
    context.font = 'bold 24px Arial';
    context.fillStyle = '#000000';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(playerName, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const plateMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plateGeometry = new THREE.PlaneGeometry(1.2, 0.3);
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.position.y = 0.4;
    plate.position.z = 0.3; // 少し前に出す
    group.add(plate);
    
    // 位置を設定
    group.position.set(position.x, position.y, position.z);
    group.userData.isPlayerObject = true;
    
    return group;
}

function show_assigned_player() {
    // 既存のプレイヤーオブジェクトを削除
    clearPlayerObjects();
    
    // コート1の選手を表示（左のコート）
    const court1_x = -court_info.width - court_info.gap;
    court_assignments.court1.forEach((player_name, index) => {
        const positions = [
            { x: court1_x - 1.5, y: 0, z: -3 },  // 左上
            { x: court1_x + 1.5, y: 0, z: -3 },  // 右上
            { x: court1_x - 1.5, y: 0, z: 3 },   // 左下
            { x: court1_x + 1.5, y: 0, z: 3 }    // 右下
        ];
        
        if (index < positions.length) {
            const playerFigure = createPlayerFigure(player_name, positions[index], 0xff4444);
            scene.add(playerFigure);
        }
    });
    
    // コート2の選手を表示（中央のコート）
    const court2_x = 0;
    court_assignments.court2.forEach((player_name, index) => {
        const positions = [
            { x: court2_x - 1.5, y: 0, z: -3 },  // 左上
            { x: court2_x + 1.5, y: 0, z: -3 },  // 右上
            { x: court2_x - 1.5, y: 0, z: 3 },   // 左下
            { x: court2_x + 1.5, y: 0, z: 3 }    // 右下
        ];
        
        if (index < positions.length) {
            const playerFigure = createPlayerFigure(player_name, positions[index], 0x44ff44);
            scene.add(playerFigure);
        }
    });
    
    // コート3の選手を表示（右のコート）
    const court3_x = court_info.width + court_info.gap;
    court_assignments.court3.forEach((player_name, index) => {
        const positions = [
            { x: court3_x - 1.5, y: 0, z: -3 },  // 左上
            { x: court3_x + 1.5, y: 0, z: -3 },  // 右上
            { x: court3_x - 1.5, y: 0, z: 3 },   // 左下
            { x: court3_x + 1.5, y: 0, z: 3 }    // 右下
        ];
        
        if (index < positions.length) {
            const playerFigure = createPlayerFigure(player_name, positions[index], 0x4444ff);
            scene.add(playerFigure);
        }
    });
}

function show_not_assigned_player() {
}

// 待機中の参加者を表示する関数
function show_waiting_players() {
    let div_waiting = document.getElementById('waiting');
    
    // 既存の表示をクリア
    while (div_waiting.firstChild) {
        div_waiting.removeChild(div_waiting.firstChild);
    }
    
    // 待機中の参加者を表示
    court_assignments.waiting.forEach(player_name => {
        let div_waiting_player = document.createElement('div');
        
        let label_player = document.createElement('label');
        label_player.textContent = player_name;
        label_player.style.marginRight = '10px';
        
        let nl = document.createElement('br');
        
        div_waiting_player.appendChild(label_player);
        div_waiting_player.appendChild(nl);
        
        div_waiting.appendChild(div_waiting_player);
    });
}


function add_player() {
    let player_name = document.getElementById('player_name').value.trim();
    let error_message = document.getElementById('error_message');
    
    // エラーメッセージをクリア
    error_message.textContent = '';
    
    // 入力検証
    if (player_name === '') {
        error_message.textContent = '参加者名を入力してください';
        return;
    }
    
    // 重複チェック
    if (player.includes(player_name)) {
        error_message.textContent = 'この参加者は既に追加されています';
        return;
    }
    
    // 休憩中の参加者との重複チェック
    if (resting_player.includes(player_name)) {
        error_message.textContent = 'この参加者は現在休憩中です';
        return;
    }
    
    // 参加者を追加
    player.push(player_name);
    document.getElementById('player_name').value = '';
    show_player();
}

// Enterキーで追加できるようにする関数
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        add_player();
    }
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



// 配列をシャッフルする関数
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// コート割り当て用のデータ構造
let court_assignments = {
    court1: [],
    court2: [],
    court3: [],
    waiting: []
};

// player : 参加者の名前
// resting_player : 休憩中の参加者の名前(割り当てない)
function assign() {
    // 既存の割り当てをクリア
    court_assignments = {
        court1: [],
        court2: [],
        court3: [],
        waiting: []
    };
    
    // 参加者をランダムにシャッフル
    const shuffled_players = shuffleArray(player);
    
    // 4名単位でコートに割り当て（4名に満たない場合は割り当てない）
    const max_courts = 3;
    let assigned_count = 0;
    
    for (let court = 0; court < max_courts; court++) {
        const court_players = [];
        
        // 4名分の参加者を取得
        for (let i = 0; i < 4; i++) {
            if (assigned_count + i < shuffled_players.length) {
                court_players.push(shuffled_players[assigned_count + i]);
            }
        }
        
        // 4名揃った場合のみコートに割り当て
        if (court_players.length === 4) {
            if (court === 0) {
                court_assignments.court1 = court_players;
            } else if (court === 1) {
                court_assignments.court2 = court_players;
            } else if (court === 2) {
                court_assignments.court3 = court_players;
            }
            assigned_count += 4;
        } else {
            // 4名に満たない場合はループ終了
            break;
        }
    }
    
    // 残りの参加者は待機リストに
    for (let i = assigned_count; i < shuffled_players.length; i++) {
        court_assignments.waiting.push(shuffled_players[i]);
    }
    
    // 割り当て結果を表示
    show_assigned_player();
    show_waiting_players();
    show_court_info();
}






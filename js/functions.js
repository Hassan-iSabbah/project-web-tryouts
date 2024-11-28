//drawing
function draw({ color = "red", x = 0, y = 0, w = 100, h = 200 }) {
    c.fillStyle = color;
    c.fillRect(x, y, w, h);
}




function drawc({ color = "red", x = 0, y = 0, s = 100 }) {
    c.beginPath();
    c.fillStyle = color;
    c.arc(x, y, s, 0, 2 * Math.PI);
    c.fill();
    c.closePath();
}



//collision detection


function rectangular_collision(r_one, r_two) {
    is_colliding = false;


    if (
        r_one.right() >= r_two.left() &&
        r_one.left() <= r_two.right() &&
        r_one.bottom() >= r_two.up() &&
        r_one.up() <= r_two.bottom()
    ) {
        is_colliding = true;
    }


    return is_colliding;
}


function keep_whole(get_number, set_number) {

    if (get_number() < 0) {
        set_number(0);
    }
}


function fetch_json(player, file_name= 'samurai_mack'){
    fetch(`./json/${file_name}.json`)
    .then(response => {
        if (!response.ok){
            return;    
        } 
        return response.json();
    })
    .then(data => {
        console.log(`data from ${file_name} = `, data);
        player.set_sprites(data);
    })
    .catch(error => {
        console.log("There was an error with the fetch operation. ", error);
    })

}
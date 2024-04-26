const music = new Audio ('/audio/1.mp3');
//music.play();

const songs = [
    {
        id: "1",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Tir-Mojgan</div>`,
        poster:"/image/music-cover1.webp"
    },
    {
        id: "2",
        songName: `Hayedeh <br> 
        <div class="song-subtitle">Nagoo-Nemiyam</div>`,
        poster:"/image/music-cover2.webp"
    },
    {
        id: "3",
        songName: `Hayedeh <br> 
        <div class="song-subtitle">Shabeh-Eshgh</div>`,
        poster:"/image/music-cover3.webp",
    },
    {
        id: "4",
        songName: `Hayedeh <br> 
        <div class="song-subtitle">Soghati</div>`,
        poster:"/image/music-cover2.webp",
    },
    {
        id: "5",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Tir-Mojgan</div>`,
        poster:"/image/music-cover1.webp",
    },
    {
        id: "6",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Vay-Be-Halesh</div>`,
        poster:"/image/music-cover4.webp",
    },
    {
        id: "7",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Minaye-Del</div>`,
        poster:"/image/music-cover4.webp",
    },
    {
        id: "8",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Minaye-Del</div>`,
        poster:"/image/music-cover4.webp",
    },
    {
        id: "9",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Nagoo-Nemiyam</div>`,
        poster:"/image/music-cover2.webp",
    },
    {
        id: "10",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Shabeh-Eshgh</div>`,
        poster:"/image/music-cover3.webp",
    },
    {
        id: "11",
        songName: `Hayedeh<br> 
        <div class="song-subtitle">Soghati</div>`,
        poster:"/image/music-cover2.webp",
    }
]

document.querySelectorAll('song-item').forEach((i) => {
    e.querySelector('img')[0].src = songs[i].poster;music.play();
    e.querySelector('h5')[0].innerHTML = songs[i].songName;
});


/////------ Menu Bottom - play music--------///////
let masterPlay = document.getElementById('masterPlay');

masterPlay.addEventListener('click', ()=> {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    } else {
        music.pause();
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
    }
});

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('fa-circle-play');
        el.classList.remove('fa-circle-pause');
    })
}

const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('song-item')).forEach((el) => {
        el.style.background = 'rgb(105, 105, 105, .0)';
    })
}

let index = 0; 
let poster_bottom_menu = document.getElementById('poster_bottom_menu');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        music.src =`/audio/${index}.mp3`;
        poster_bottom_menu.src =`/image/music-cover${index}.webp`;

        music.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        currentStart.innerText = `${min2}:${sec2}`;
        
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach(elss => {
            let {songName} = elss;
            title.innerHTML = songName;
        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('song-item'))[index - 1].style.background = "rgb(105, 105, 105, .1)";   
        makeAllplays();
        el.target.classList.remove('fa-circle-play');
        el.target.classList.add('fa-circle-pause');
    });
})

/////----- Song Time  ------ /////
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }

    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);

    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;

    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', ()=> {
    music.currentTime = seek.value * music.duration / 100;
});

/////----- Volume Song   ------ /////

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let volume_bar = document.getElementsByClassName('volume_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', ()=> {
    if (vol.value == 0) {
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.add('fa-volume-xmark');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.add('fa-volume-low');
        vol_icon.classList.remove('fa-volume-xmark');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('fa-volume-high');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.remove('fa-volume-xmark');
    }

    let vol_a = vol.value;
    volume_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});

/////----- Menu buttons ------ /////

let back = document.getElementById('back');
let next = document.getElementById('next');

///--- back btn ---///
back.addEventListener('click', ()=> {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('song-item')).length;
    }

    music.src =`/audio/${index}.mp3`;
    poster_bottom_menu.src =`/image/music-cover${index}.webp`;
    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    currentStart.innerText = `${min2}:${sec2}`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let {songName} = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('song-item'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('fa-circle-play');
    el.target.classList.add('fa-circle-pause')
})

////--- next btn ---//////

next.addEventListener ('click', () => {
    index ++;

    if (index > Array.from(document.getElementsByClassName('song-item')).length) {
        index = 1;
    }


    music.src =`/audio/${index}.mp3`;
    poster_bottom_menu.src =`/image/music-cover${index}.webp`;
    music.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    currentStart.innerText = `${min2}:${sec2}`;

    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss => {
        let {songName} = elss;
        title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('song-item'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('fa-circle-play');
    el.target.classList.add('fa-circle-pause')
});
/////////////////////////


let c=document.getElementById("my-canvas");
let ctx=c.getContext("2d");

let loadImage=(src,callback)=>{
    let img=document.createElement("img");
    img.onload=()=>callback(img);
    img.src=src;
};

let imagePath=(frameNumber,animation)=>{
    return animation+"/"+frameNumber+".png";
};

let frames={
    backward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9],
    forward:[1,2,3,4,5,6],
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7]
};

let loadImages=(callback)=>{
    let images={backward:[],block:[],forward:[],idle:[],kick:[],punch:[]};
    let imagesToLoad=0;
    ["backward","block","forward","idle","kick","punch"].forEach((animation) => {
        let animationFrames=frames[animation];
        imagesToLoad=imagesToLoad+animationFrames.length;
        animationFrames.forEach((frameNumber)=>{
            let path=imagePath(frameNumber,animation);
            loadImage(path,(image)=>{
                images[animation][frameNumber-1]=image;
                imagesToLoad=imagesToLoad-1;
                if(imagesToLoad===0){
                    callback(images);
                }
            });
        });
    });
};

let animate=(ctx,images,animation,callback)=>{
    images[animation].forEach((image,index)=>{
        setTimeout(()=>{
            ctx.clearRect(20,0,500,500);
            ctx.drawImage(image,20,0,500,500);
        },index*100);
    });
    setTimeout(callback,images[animation].length*100);
};

loadImages((image)=>{
    let queuedAnimations=[];
    let aux=()=>{
        let selectedAnimation;
        if(queuedAnimations.length===0){
            selectedAnimation="idle";
        }else{
            selectedAnimation=queuedAnimations.shift();
        }
        animate(ctx,image,selectedAnimation,aux);
    };
    aux();
    document.getElementById("backward").onclick=()=>{
        queuedAnimations.push("backward");
    };
    document.getElementById("block").onclick=()=>{
        queuedAnimations.push("block");
    };
    document.getElementById("forward").onclick=()=>{
        queuedAnimations.push("forward");
    };
    document.getElementById("kick").onclick=()=>{
        queuedAnimations.push("kick");
    };
    document.getElementById("punch").onclick=()=>{
        queuedAnimations.push("punch");
    };
    document.addEventListener("keyup",(event)=>{
        const key=event.key;
        if(key==="ArrowLeft"){
            queuedAnimations.push("backward");
        }else if(key==="Arrowdown"){
            queuedAnimations.push("block");
        }else if(key==="ArrowRight"){
            queuedAnimations.push("forward");
        }else if(key==="Spacebar"){
            queuedAnimations.push("kick");
        }else if(key==="Arrowup"){
            queuedAnimations.push("punch");
        };
    });
});

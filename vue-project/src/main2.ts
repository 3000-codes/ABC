import { ref,type Ref, watchEffect } from 'vue';

// Prepare materials: create 10 rows.
const ul=document.querySelector('ul') as HTMLUListElement;
for(let i=0;i<10;i++){
    const li=document.createElement('li');
    li.id=`row-${i}`;
    li.innerHTML=`Row ${i}`;
    ul.appendChild(li);
}


const rowStates:Map<string,Ref<boolean>> = new Map(); // or new WeakMap()
let activeRow:string;

document.querySelectorAll('li').forEach((row) => {
    // Set row state.
    rowStates.set(row.id, ref(false));

    row.addEventListener('click', () => {
        // Update row state.
        if (activeRow) rowStates.get(activeRow)!.value = false;
        activeRow = row.id;
        rowStates.get(activeRow)!.value = true;
    });

    watchEffect(() => {
        // Read row state.
        if (rowStates.get(row.id)!.value) {
            row.classList.add('active');
        } else {
            row.classList.remove('active');
        }
    });
});

const obj={
    a:1,
    b:'str',
    c:true
}

// type keys= keyof typeof obj;

// const keys=Object.keys as <T>(o:T)=>(keyof T)[];
const keys=Object.keys as <T>(o:T)=>Extract<keyof T,string>[];

const keys2=keys(obj)[0];
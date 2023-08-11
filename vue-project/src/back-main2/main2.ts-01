import { ref,type Ref, watchEffect } from 'vue';

// Prepare materials: create 10 rows.
const ul=document.querySelector('ul') as HTMLUListElement;
for(let i=0;i<10;i++){
    const li=document.createElement('li');
    li.id=`row-${i}`;
    li.innerHTML=`Row ${i}`;
    ul.appendChild(li);
}


const rowStates:Record<string,Ref<boolean>> = {};
let activeRow:string;

document.querySelectorAll('li').forEach((row) => {
    // Set row state.
    rowStates[row.id] = ref(false);

    row.addEventListener('click', () => {
        // Update row state.
        if (activeRow) rowStates[activeRow].value = false;

        activeRow = row.id;

        rowStates[row.id].value = true;
    });

    watchEffect(() => {
        // Read row state.
        if (rowStates[row.id].value) {
            row.classList.add('active');
        } else {
            row.classList.remove('active');
        }
    });
});
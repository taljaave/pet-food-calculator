// Исправления для pet_food_calculator_v3.html

// Переопределяем функцию updateRationField
window.updateRationField = function(id,field,value){
    const p = state.rationProducts.find(p=>p.id===id);
    if(!p) return;
    if(field==='share'){
        handleShareChange(p, parseFloat(value)||0);
        return;
    }
    if(field==='available'||field==='price') p[field]=parseFloat(value)||0;
    saveState();
    renderTable();
};

window.handleShareChange = function(p, ns){
    var cn = p.category;
    var ps = state.rationProducts.filter(function(x){return x.category===cn});
    if(ps.length<=1){p.share=ns;saveState();renderTable();return;}
    var os = ps.filter(function(x){return x.id!==p.id});
    if(os.length===0){p.share=ns;saveState();renderTable();return;}
    var ot = os.reduce(function(s,x){return s+(x.share||0)},0);
    if(ot===0){
        if(confirm('In category "'+cn+'" only 1 product with %. Set '+ns+'%?')){
            p.share=ns;
            saveState();
            renderTable();
        }
    } else {
        var ok = confirm('Change % for "'+p.name+'" from '+p.share+'% to '+ns+'%? OK-redistribute, Cancel-no');
        if(ok){
            var rem = 100-ns;
            if(ot>0){
                var ratio = rem/ot;
                os.forEach(function(op){op.share=Math.max(0,op.share*ratio)});
            }
            p.share = ns;
        }
        saveState();
        renderTable();
    }
};

console.log("Calculator fixes loaded");

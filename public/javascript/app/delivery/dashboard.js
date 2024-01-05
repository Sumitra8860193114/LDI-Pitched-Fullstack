$(window).on('load', initialize);

const classes = {
    type:{
        cancelled:"table-danger",
        approved: "table-success",
        waiting:  "table-warning"
    }
}

let types = {
    approved : {
        label:"1*",
        isSelected:false
    },
    waiting : {
        label:"2**",
        isSelected:false
    },
    cancelled : {
        label:"3***",
        isSelected:false
    }
};

function getSelect(selected){
  let html =  Object.keys(types).map(type => {
        return ` <option ${type == selected ? 'selected="true"' : ""} value="${type}">${types[type].label}</option>`
  }).join('');
  return  `<select class="custom-select status" name="status">${html}</select>`
}

function initialize() {
    let orderDetailsTable = new Table({
        target:'#order-details',
        columns:[
            {title:'S.No'},
           {title: 'name'},
           {title: 'title'},
           {title: 'content'}
        ],
        formatter: formatTableResponse
    })

    function formatTableResponse(data, from=0){
        return data.map(function(row,index){
            return {
                attributes: {
                    id: row._id
                },
                classes:classes.type[row.status],
                data: {
                    Sno:`${(from + (index + 1))}`,
                    //ordername: row.requirement.charAt(0).toUpperCase() + row.requirement.slice(1),
                    //category: row.category.charAt(0).toUpperCase() + row.category.slice(1),
                    name: row.name,
                    title: row.title, 
                    pitchedBy: row.user.content,
                    status: getSelect(row.status || 'approved'),
                    
                }
            }
        })
    }
    
    orderDetailsTable.render(`/api/app`);
    $('#order-details').on('change','select.status',function(){
        let value = $(this).val();
        let _classes = Object.keys(classes.type).map(e => classes.type[e]).join(' ');
        let _class = classes.type[value] || "";

        let $tr = $(this).parents('tr').first();
        let id = $tr.data('id');
       
        $tr.removeClass(_classes).addClass(_class);

        let data = {
            status: value
        }

        $.ajax({
            url: `/api/app/${id}`,
            method: 'put',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function () {
                Swal.fire(
                    'Success!',
                    'Order status updated successfully.',
                    'success'
                )
            },
            error: function () {
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                );
            }
        })
    })
}







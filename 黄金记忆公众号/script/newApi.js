function openContact(){
    api.openContacts( function ( ret, err ) {
      if ( ret && ret.status ) {
        var name = ret.name;
        var phone = ret.phone;
        if($("#name").length>0){
          $("#name").val(name);
        }
        if($("#phone").length>0){
          $("#phone").val(phone);
        }
      }
  } );
}

const API_URL = "http://127.0.0.1:3000";
const ROUTE_MATCHS = API_URL + "/match";

function getMatchs(){
    return $.ajax({
       url : ROUTE_MATCHS,
       type : 'GET',
       data : {flag : "Get Match"},
       dataType : 'json',
    });
}

getMatchs()
    .then(function(data){
        initTableMatchs(data);
    });



function initTableMatchs(allMatchs){ 
	var jsonArray = [];
    for(var match in allMatchs){

        jsonArray.push({
            date : allMatchs[match].date,
            match : allMatchs[match].match,
            score : allMatchs[match].score
        });
        
    }
	$('#matchsTable').bootstrapTable({
	    pagination : true,
	    pageSize : 10,
	    search : true,
	    columns: [{
	        field: 'date',
	        title: 'Date',
            sortable : true,
	    }, {
	        field: 'match',
	        title: 'Match',
            sortable : true,
	    }, {
	        field: 'score',
	        title: 'Score',
            sortable : true,
	    }, {
	    	field: 'cellFormater',
	    	title: 'Actions',
	    	formatter : operateFormatterModels,
	    	events : operateEventsModels
	    }],
	    
	    data : jsonArray
	});
}

//Méthode pour ajouter deux icones d'action à la fin d'une ligne du tableau des utilisateurs
function operateFormatterModels(value, row, index) {
	return [
	    '<center><a class="modifyModel" href="javascript:void(0)" title="Editer">',
	    '<i class="glyphicon glyphicon-edit"></i>',
	    '</a>&nbsp;&nbsp;&nbsp;',
	    '<a class="deleteChapter" href="javascript:void(0)" title="Supprimer">',
	    '<i class="glyphicon glyphicon-remove"></i>',
	    '</a></center>'
	].join('');
}

//Méthode appelée lorsque l'utilisateur clique sur les boutons "supprimer" ou "éditer" un utilisateur
window.operateEventsModels = {
    'click .modifyModel': function (e, value, row, index) {
        /*
    	//On met les champs du modal à vide
    	$("#editChapterId").empty();
    	$("#editChapterName").empty();
    	$("#editChapterDescr").empty();
    	
        //On recupere les valeurs du tableau pour les mettres dans les champs
    	$("#editChapterId").val(row.id);
    	$("#editChapterName").val(row.name);
    	$("#editChapterDescr").val(row.description);
        
    	
        //Déclanchement de la fonction de modification sur le bouton de validation de la Modal
    	$("#val_mod").attr("onclick", "editChapterBdd("+ row.id +")");;
        
        //on fait poper le modal modif utilisateur
        $('#Edit_Chapter_Modal').modal('show');
        */

    },
    'click .deleteChapter': function (e, value, row, index) {
       /*
       	if (confirm("Etes-vous sûr de vouloir supprimer le chapitre : "+row.name+"?")) {
		    deletChapter(row.id).then(function(){
                alert("Chapitre Supprimé");
                location.reload();
            }).catch(function(){
                alert("Erreur lors de la suppression du chapitre");
            });
        }*/
    },
    
};
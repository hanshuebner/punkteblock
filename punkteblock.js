
function currentScoreCell() {
    return $('#resultate tbody .next');
}

function recalculate() {
    var scores = [];
    $('#resultate tbody tr').each(function () {
        var results = $(this).children();
        for (var i = 1; i < results.length; i++) {
            var score = $(results[i]).html();
            if (score) {
                scores[i - 1] = (scores[i - 1] || 0) + parseInt(score);
            }
        }
    });
    var sums = $('#resultate tfoot tr').children();
    for (var i = 0; i < scores.length; i++) {
        $(sums[i + 1]).html(scores[i]);
    }
}

function processScore() {
    var scoreElement = currentScoreCell();
    scoreElement.removeClass('next');
    var allCells = scoreElement.parent().children();
    var thisIndex = allCells.index(scoreElement);
    if (thisIndex + 1 == allCells.length) {
        var newRow = scoreElement.parent().clone();
        var newChildren = newRow.children();
        $(newChildren[0]).html(parseInt($(scoreElement.parent().children()[0]).html()) + 1);
        $(newChildren[1]).addClass('next');
        for (var i = 1; i < newRow.children().length; i++) {
            $(newChildren[i]).html('');
        }
        newRow.appendTo(scoreElement.parent().parent());
    } else {
        $(scoreElement.parent().children()[thisIndex + 1]).addClass('next');
    }
    recalculate();
    $('#keypad').focus();
}

$(document).ready(function () {

    function addCharToCurrentCell(char) {
        if (currentScoreCell().html().length != 4) {
            currentScoreCell().html(currentScoreCell().html() + char);
        }
    }

    function clearCurrentCell() {
        currentScoreCell().html('');
    }

    $('#keypad button').on('click', function () {
        switch (this.name) {
        case 'clear':
            clearCurrentCell();
            break;
        case 'enter':
            processScore();
            break;
        default:
            addCharToCurrentCell(this.name);
            break;
        }
    });
    $('#keypad')
        .focus()
        .on('keypress', function (event) {
            switch (event.charCode) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                addCharToCurrentCell(String.fromCharCode(event.charCode));
                break;
            case 8:
                clearCurrentCell();
                event.preventDefault();
                break;
            case 10:
            case 13:
                processScore();
                break;
            }
        });
});

// Autorem skryptu jest: S�AWOMIR KOK�OWSKI
// www.kurshtml.boo.pl
// Je�li chcesz wykorzysta� ten skrypt na swojej stronie, nie usuwaj tego komentarza!

var baseAddr = null;

baseAddr = window.location.protocol + '//' + window.location.host + '/'

function tree(id)
{
  this.id = id;

  this.click = function ()
  {
    for (var i = 0, el_node; i < this.parentNode.childNodes.length; i++)
    {
      el_node = this.parentNode.childNodes.item(i)
      if (el_node.nodeName.toLowerCase() == 'ul')
      {
        el_node.style.display = el_node.style.display == 'none' ? 'block' : 'none';
        this.parentNode.style.backgroundImage = 'url("' + baseAddr + (el_node.style.display == 'none' ? 'images/closed' : 'images/opened') + '.gif")';
        return;
      }
    }
  }

  this.start = function (el)
  {
    for (var i = 0, el_node; i < el.childNodes.length; i++)
    {
      el_node = el.childNodes.item(i);
      if (el_node.nodeName.toLowerCase() == 'a')
      {
        el_node.onclick = this.click;
        for (var j = 0; j < el_node.parentNode.childNodes.length; j++)
        {
          if (el_node.parentNode.childNodes.item(j).nodeName.toLowerCase() == 'ul')
          {
            el_node.parentNode.style.backgroundImage = 'url("' + baseAddr + 'images/closed.gif")';
            el_node.className = (el_node.className ? el_node.className + ' ' : '') + 'folder';
            break;
          }
          if (el_node.parentNode.childNodes.item(j).nodeName.toLowerCase() == 'li') break;
        }
        if (el_node.href && unescape(el_node.href) == unescape(window.location.href))
        {
          el_node.className = 'active';
          var el_parentNode = el_node;
          do
          {
            el_parentNode = el_parentNode.parentNode;
            if (el_parentNode.nodeName.toLowerCase() == 'ul')
            {
              el_parentNode.style.display = 'block';
              if (document.getElementById(this.id) != el_parentNode) el_parentNode.parentNode.style.backgroundImage = 'url("' + baseAddr + 'images/opened.gif")';
            }
          }
          while (document.getElementById(this.id) != el_parentNode)
        }
      }
      else if (el_node.nodeName.toLowerCase() == 'ul') el_node.style.display = 'none';
      this.start(el_node);
    }
  }

  if (document.getElementById && document.childNodes)
  {
    if (document.images)
    {
      new Image().src = baseAddr + 'images/opened.gif';
      new Image().src = baseAddr + 'images/document.gif';
    }
    this.start(document.getElementById(this.id));
  }
}


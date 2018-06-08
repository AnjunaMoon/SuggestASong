using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuggestASong.Models
{
    public interface IGenres
    {
        List<string> Genres { get; set; }
    }
}

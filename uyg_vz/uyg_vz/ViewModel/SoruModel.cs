using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg_vz.ViewModel
{
    public class SoruModel
    {
        public string soruId { get; set; }
        public string soruAnketId { get; set; }
        public string soru { get; set; }
        public int soruSecenekSayisi { get; set; }
        public SoruModel soruBilgi { get; set; }
        public AnketModel anketBilgi { get; set; }
        public List<SecenekModel> secenekler { get; set; }
    }
}
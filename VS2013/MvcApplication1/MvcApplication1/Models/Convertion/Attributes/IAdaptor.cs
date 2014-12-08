using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    [AttributeUsage(AttributeTargets.Property)]
    public class IAdaptor : Attribute
    {
        public bool Exclusion { get; set; }
        public IAdaptor(bool exclusion)
        {
            Exclusion = exclusion;
        }
    }


}

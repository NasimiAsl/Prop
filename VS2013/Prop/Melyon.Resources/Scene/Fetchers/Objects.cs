
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fetchers
{
    public class Objects : Foundation.Resources.FetchersBase<Melyon.Resources.Scene.EntitiesScene, Melyon.Resources.Scene.Object>
    {
        public Object ByName(string name, Melyon.Resources.Scene.EntitiesScene context = null)
        {
            context = GetInstance(context);

            return context.Stored_0014(name).FirstOrDefault();
        }
    }
}

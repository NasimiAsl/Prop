using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.Resources
{
    public static class ResourcesExtentionMethods
    {
        public static RepositoryBase<Entities> GetRepository<Entities>(this Entities context) where Entities : ObjectContext
        {
            return new RepositoryBase<Entities>();
        }
    }
}

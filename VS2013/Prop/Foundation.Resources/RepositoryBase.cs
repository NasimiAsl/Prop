using System;
using System.Collections.Generic;
using System.Data.Metadata.Edm;
using System.Data.Objects;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Foundation.Resources
{

    

    public class RepositoryBase<OContext> where OContext : ObjectContext
    {

        public delegate bool AddSubItemsHandler<Entity>(RepositoryBase<OContext> r, Entity c, string d);
         
        public OContext Context { get; set; }

        /// <summary>
        /// .ctor
        /// </summary>
        public RepositoryBase()
        {
            var type = (typeof(OContext));
            Context = (OContext)type.Assembly.CreateInstance(type.FullName);
        }

        /// <summary>
        /// .ctor
        /// </summary>
        /// <param name="context"></param>
        public RepositoryBase(OContext context)
        {
            Context = context;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        public void Add<TEntity>(TEntity entity)
        {
            Context.AddObject(RepositoryBase<OContext>.GetEntitySet<TEntity>(Context).Name, entity);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        public void Remove<TEntity>(TEntity entity)
        {
            Context.DeleteObject(entity);
        }

        public string ErrorMessage { get; set; }
        public Exception Error { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool Save()
        {
            try
            {
                Context.SaveChanges();
                Error = null;
                ErrorMessage = "";
                return true;
            }
            catch (Exception ex)
            {
                Error = ex;
                ErrorMessage = ex.Message;

                Profiler.LogEvent(Context.DefaultContainerName + " Save Failure!", (Error != null && Error.InnerException != null ? Error.InnerException.Message : "") +
                    " \r\n" + ErrorMessage, "error");
            }

            return false;
        }


        public void Clear<Entity>(IEnumerable<Entity> list)
        {
            foreach (var item in list)
            {
                Remove(item);
            }
        }

      

        /// <summary>
        /// returns the given entity entitySet
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="context"></param>
        /// <returns></returns>
        private static EntitySetBase GetEntitySet<TEntity>(OContext context)
        {
            EntityContainer container = context.MetadataWorkspace.GetEntityContainer(context.DefaultContainerName, DataSpace.CSpace);

            EntitySetBase entitySet = container.BaseEntitySets.FirstOrDefault(item => item.ElementType.Name.Equals(typeof(TEntity).Name));
            return entitySet;
        }
         
          
    }
}

using System.Collections;
using System.Collections.Generic;

namespace Exam.Infrastructure
{
    public class ItemList<T>: IReadOnlyCollection<T>
    {
        private readonly List<T> _items;
        private readonly int _size;
        private readonly int _take;
        private readonly int _skip;


        public ItemList(List<T> items, int size, int take, int skip)
        {
            _items = items;
            _size = size;
            _take = take;
            _skip = skip;
        }


        public List<T> Items => _items;

        public int Size => _size;

        public int Take => _take;

        public int Skip => _skip;

        public IEnumerator<T> GetEnumerator()
        {
            return _items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public int Count => _items.Count;
    }
}
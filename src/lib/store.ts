import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered';
  createdAt: string;
}

interface Appointment {
  id: string;
  userId: string;
  serviceType: string;
  address: string;
  appointmentDate: string;
  status: 'pending' | 'confirmed' | 'completed';
  paymentStatus: 'pending' | 'paid';
}

interface StoreState {
  user: User | null;
  isAuthenticated: boolean;
  products: Product[];
  categories: Category[];
  appointments: Appointment[];
  orders: Order[];
  cartItems: CartItem[];
  searchQuery: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'paymentStatus'>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  placeOrder: () => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      products: [
        {
          id: '1',
          name: 'Paracetamol',
          description: 'Pain relief medication',
          price: 50,
          category: 'medicines',
          stock: 100,
          image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80'
        },
        {
          id: '2',
          name: 'Blood Pressure Monitor',
          description: 'Digital BP monitor for home use',
          price: 1999,
          category: 'healthcare',
          stock: 50,
          image_url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80'
        },
        {
          id: '3',
          name: 'Vitamin C Tablets',
          description: 'Immunity booster supplements',
          price: 299,
          category: 'medicines',
          stock: 200,
          image_url: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?auto=format&fit=crop&q=80'
        },
        {
          id: '4',
          name: 'First Aid Kit',
          description: 'Complete emergency medical kit',
          price: 799,
          category: 'healthcare',
          stock: 30,
          image_url: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80'
        }
      ],
      categories: [
        { id: '1', name: 'Medicines', slug: 'medicines' },
        { id: '2', name: 'Healthcare', slug: 'healthcare' }
      ],
      appointments: [],
      orders: [],
      cartItems: [],
      searchQuery: '',
      login: (email, password) => {
        if (email === 'user1@gmail.com' && password === 'password@1') {
          set({
            user: {
              id: '1',
              email: 'user1@gmail.com',
              name: 'Navneet Pali',
              phone: '+91 9876543210',
              address: '123 Healthcare Street, Indore'
            },
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        })),
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Math.random().toString(36).substr(2, 9) }]
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...product } : p))
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        })),
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: Math.random().toString(36).substr(2, 9) }]
        })),
      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [
            ...state.appointments,
            {
              ...appointment,
              id: Math.random().toString(36).substr(2, 9),
              status: 'pending',
              paymentStatus: 'pending'
            }
          ]
        })),
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }]
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId)
        })),
      updateCartItemQuantity: (productId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          )
        })),
      placeOrder: () => {
        const { cartItems, user } = get();
        if (!user) return;
        
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = {
          id: Math.random().toString(36).substr(2, 9),
          userId: user.id,
          items: [...cartItems],
          total,
          status: 'pending' as const,
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          orders: [order, ...state.orders],
          cartItems: []
        }));
      },
      clearCart: () => set({ cartItems: [] }),
      setSearchQuery: (query) => set({ searchQuery: query })
    }),
    {
      name: 'healthcare-store'
    }
  )
);
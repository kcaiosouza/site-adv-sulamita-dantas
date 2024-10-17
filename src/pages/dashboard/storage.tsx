import { useEffect, useState } from 'react';
import { storage } from '@/services/firebase'; 
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SideBar from '@/components/SideBar';
import DashboardHeader from '@/components/DashboardHeader';
import styles from "@/styles/_dashboard.module.css";
import Image from 'next/image';
import { BiLinkExternal, BiTrash } from 'react-icons/bi';
import CountUp from 'react-countup';
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link';

export default function Storage() {
  const [files, setFiles] = useState<{ url: string; size: number }[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const listRef = ref(storage, 'postsImages/');
      let size = 0;

      try {
        const res = await listAll(listRef);
        const filePromises = res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          size += metadata.size;
          return { url, size: metadata.size, name: item.name };
        });

        const fileDetails = await Promise.all(filePromises);
        setFiles(fileDetails);
        setTotalSize(size);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileName: string) => {
    const fileRef = ref(storage, `postsImages/${fileName}`);

    try {
      await deleteObject(fileRef);
      setFiles((prevFiles) => prevFiles.filter((file: any) => file.name !== fileName));
      const updatedSize = files
        .filter((file:any) => file.name !== fileName)
        .reduce((acc, file) => acc + file.size, 0);
      setTotalSize(updatedSize);
      alert('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file');
    }
  };

  if (loading) return(
    <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
      <SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
        <DashboardHeader title="Todas as imagens"/>
        <div className="">
				<Table>
					<TableCaption><Skeleton className="w-[180px] h-4 rounded-full" />
          .</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[100px]"></TableHead>
							<TableHead>Titulo</TableHead>
							<TableHead className="text-right">Tamanho</TableHead>
							<TableHead className="text-right">Ação</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
            <TableRow className="hover:bg-[var(--light-brown)]">
              <TableCell className="font-medium">
                <Skeleton className="w-14 h-14 rounded-md" />
              </TableCell>
              <TableCell className='w-full'>
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[50px] h-[30px] rounded-md" />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-[var(--light-brown)]">
              <TableCell className="font-medium">
                <Skeleton className="w-14 h-14 rounded-md" />
              </TableCell>
              <TableCell className='w-full'>
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[50px] h-[30px] rounded-md" />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-[var(--light-brown)]">
              <TableCell className="font-medium">
                <Skeleton className="w-14 h-14 rounded-md" />
              </TableCell>
              <TableCell className='w-full'>
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[50px] h-[30px] rounded-md" />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-[var(--light-brown)]">
              <TableCell className="font-medium">
                <Skeleton className="w-14 h-14 rounded-md" />
              </TableCell>
              <TableCell className='w-full'>
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[50px] h-[30px] rounded-md" />
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-[var(--light-brown)]">
              <TableCell className="font-medium">
                <Skeleton className="w-14 h-14 rounded-md" />
              </TableCell>
              <TableCell className='w-full'>
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-4 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-[50px] h-[30px] rounded-md" />
              </TableCell>
            </TableRow>
					</TableBody>
				</Table>
        </div>
      </main>
    </div>
  );

  return (
    <div className="flex flex-row min-h-[100dvh] bg-[var(--white-brown)] p-7">
      <SideBar currentPage='posts'/>
			<main className={`flex-[1] h-full pl-7 ${styles.main}`}>
        <DashboardHeader title="Todas as imagens"/>
        <div className="">
				<Table>
					<TableCaption>Armazenamento usado: {(totalSize / (1024 * 1024)).toFixed(2)}MB / 1024MB</TableCaption>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-[100px]"></TableHead>
							<TableHead>Titulo</TableHead>
							<TableHead className="text-right">Tamanho</TableHead>
							<TableHead className="text-right">Ação</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{files.map((file: any, index: number) => {
              console.log(file.name)
              let sizeFile = (file.size / (1024 * 1024));
							return(
								<TableRow key={index} className="hover:bg-[var(--light-brown)]">
									<TableCell className="font-medium">
										<Image src={file.url} width={56} height={56} alt='Foto de Perfil' className={`rounded-md object-contain border-2 border-[var(--white-brown)]`}/>
									</TableCell>
									<TableCell>Arquivo nº {index + 1}</TableCell>
									<TableCell className="text-right">
										<CountUp end={sizeFile} duration={1} decimals={2} suffix='MB'/>
									</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger className="border-2 px-3 py-1 rounded-md">Abrir</DropdownMenuTrigger>
											<DropdownMenuContent>
												<DropdownMenuLabel>Ações</DropdownMenuLabel>
												<DropdownMenuSeparator />
                        <Link href={file.url} target='_blank'>
												  <DropdownMenuItem className="cursor-pointer"><BiLinkExternal className="mr-1"/> Abrir</DropdownMenuItem>
                        </Link>
												<DropdownMenuItem className="cursor-pointer" onClick={() => handleDelete(file.name)}><BiTrash className="mr-1"/> Deletar</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
        </div>
      </main>
    </div>
  );
};